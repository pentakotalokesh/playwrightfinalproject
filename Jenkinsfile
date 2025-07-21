pipeline {
  agent any
  tools {
    nodejs 'NodeJS 23' // Match your configured NodeJS version
  }
  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/your-username/your-repo.git', branch: 'main'
      }
    }
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install --with-deps'
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
