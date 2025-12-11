pipeline {
    agent {
        label {
            label 'slave-01'
            retries 2
        }
    }

    environment {
        GITHUB_URL   = "https://github.com/titas2003/hello.tima.com.git"
        GITHUB_USER  = "github_titas"
        GITHUB_BRANCH = "main"
        DOCKER_REPO = "titas2003"
    }

    stages {

        stage('Checkout Source') {
            steps {
                echo "Cloning ${GITHUB_URL}..."
                git branch: "${GITHUB_BRANCH}", credentialsId: "${GITHUB_USER}", url: "${GITHUB_URL}"
                sh 'ls -l'
            }
        }

        stage('Check Project') {
            steps {
                script {
                    if (!fileExists('package.json')) {
                        echo "package.json missing. Stopping pipeline..."
                        currentBuild.result = 'SUCCESS'
                        error("No artifact to build.")
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'titas2003', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
                ]) {
                    sh '''
                        echo "Building Docker image..."
                        sudo docker build -t hellopipe:v1.${BUILD_NUMBER} .

                        echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin

                        sudo docker tag hellopipe:v1.${BUILD_NUMBER} ${DOCKER_USER}/hellopipe:v1.${BUILD_NUMBER}
                        sudo docker push ${DOCKER_USER}/hellopipe:v1.${BUILD_NUMBER}

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "Deploying to Kubernetes via SSH Publisher..."

                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'kmaster',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'k8s/*.yaml',
                                    removePrefix: 'k8s',
                                    remoteDirectory: '/home/devopsadmin',
                                    execCommand: '''
                                        sed -i "s|IMAGE_REPLACE|titas2003/hellopipe:v1.${BUILD_NUMBER}|g" /home/devopsadmin/deployment.yaml
                                        kubectl apply -f /home/devopsadmin/deployment.yaml
                                        kubectl apply -f /home/devopsadmin/service.yaml
                                        kubectl rollout status deployment/hellopipe-deploy
                                        kubectl get pods -o wide
                                    ''',
                                    execTimeout: 120000
                                )
                            ],
                            verbose: true
                        )
                    ]
                )
            }
        }
    }

    post {
        success {
            echo "Deployment completed successfully!"
        }
        failure {
            echo "Pipeline failed."
        }
    }
}
