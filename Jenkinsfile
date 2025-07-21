pipeline {
  agent any
  tools {
    nodejs 'NodeJS 23' // Match your configured NodeJS version
  }
  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/pentakotalokesh/playwrightfinalproject.git', branch: 'main'
      }
    }
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'npx playwright test --reporter=html'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
      publishHTML(target: [
        reportName: 'Playwright Report',
        reportDir: 'playwright-report',
        reportFiles: 'index.html'
      ])
    }
  }
}
