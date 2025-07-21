pipeline {
    agent any
    environment{
        NODE_ENV = 'test'
    }
    tools{
        nodejs "Node 23"
    }
    stages{
        stage('Clone Repo'){
            steps{
                git branch:'main', url:'https://github.com/pentakotalokesh/playwrightfinalproject.git'
            }
        }
        stage('Install Dependencies'){
            steps{
                sh 'npm install'
            }
        }
        stage('Run Tests'){
            steps{
                sh 'npx playwright install'
                sg 'npx playwright test'
            }
        }
    }
    post{
        always {
            echo 'Pipeline execution complete'
        }
        failure{
            echo 'Build failed!'
        }
    }
}