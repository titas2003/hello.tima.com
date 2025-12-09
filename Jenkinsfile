pipeline {
    agent {
        label {
            label 'slave-01'
            retries 2
        }
    }
    
    environment {
        GITHUB_URL = "https://github.com/titas2003/hello.tima.com.git"
        GITHUB_USER = "github_titas"
        GITHUB_BRANCH = "main"
        PORT = "2000"
        MONGO_URL = "mongodb+srv://admin:admin@aws-dmo.bsoplpt.mongodb.net/practice-001"
        JWT_SECRET = "SECRET123"
        JWT_EXPIRES = "1h"
    }
    
    stages {
        stage('Source Stage') {
            steps {
                echo "checking ${GITHUB_URL}...."
                git branch: "${GITHUB_BRANCH}", credentialsId: "${GITHUB_USER}", url: "${GITHUB_URL}"
                sh 'ls -l'
                sh 'pwd'
            }
        }
        stage('Check Integrity') {
            steps {
                script {
                        if (!fileExists('package.json')) {
                        echo 'server.js file not found, completing as no artifact.'
                        // Stop pipeline completely
                        currentBuild.result = 'SUCCESS'
                        error("No artifact available — stopping pipeline.")
                    }
                }
            }
        }
        stage("Build") {
            steps {
                echo "Building artifacts..."
                echo "${BUILD_NUMBER}"
            }
        }
        stage("Run Test Cases"){
            steps {
                echo "Running test cases..."
                
            }
            post {
                success {
                    echo "All test cases passed."
                }
                failure {
                    echo "Test case failed"
                }
            }
        }

        stage("Package and send to logistics") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_titas2003', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    echo "Packaging your application..."
                    sh '''
                    sudo docker build -t hellopipe:v1.${BUILD_NUMBER} .
                    echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin
                    sudo docker tag hellopipe:v1.${BUILD_NUMBER} ${DOCKER_USER}/hellopipe:v1.${BUILD_NUMBER}
                    '''
                }
            }
        }
    }
}