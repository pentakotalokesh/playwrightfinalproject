pipeline {
  agent any
  tools {
    nodejs 'NodeJS 23' // Make sure this matches your configured NodeJS tool
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/pentakotalokesh/playwrightfinalproject.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        // Install node dependencies and required reporting tools
        sh '''
          npm ci
          npx playwright install
          npm install -D allure-playwright
          npm install -g allure-commandline --save-dev
        '''
      }
    }

    stage('Run Tests') {
      steps {
        // Run Playwright tests with Allure reporter and generate static HTML
        sh '''
          npx playwright test --reporter=allure-playwright
          
          allure generate allure-results --clean -o allure-report
        '''
      }
    }
  }

  post {
    always {
      // Archive test reports
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true

      catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        // Publish HTML version of Allure report
        publishHTML(target: [
          reportName: 'Allure Report',
          reportDir: 'allure-report',
          reportFiles: 'index.html',
          keepAll: true,
          alwaysLinkToLastBuild: true,
          allowMissing: true
        ])

        // Optionally publish Playwright's HTML report too (if generated separately)
        publishHTML(target: [
          reportName: 'Playwright HTML Report',
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          keepAll: true,
          alwaysLinkToLastBuild: true,
          allowMissing: true
        ])
      }
    }
  }
}
