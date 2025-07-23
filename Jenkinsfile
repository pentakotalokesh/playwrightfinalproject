pipeline {
  agent any
  tools {
    nodejs 'NodeJS 23'
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/pentakotalokesh/playwrightfinalproject.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh '''
          npm ci
          npx playwright install
          npm install -D allure-playwright
        '''
      }
    }

    stage('Run Tests') {
      steps {
        sh '''
          npx playwright test
        '''
      }
    }

    stage('Generate Allure Report') {
      steps {
        allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
    }
  }
}
