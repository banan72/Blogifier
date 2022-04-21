pipeline {
    agent any

    environment {
        TIMESTAMP = sh(script: "date +%s", returnStdout: true).trim()
        SCREENSHOT_PATH = "screenshots/${TIMESTAMP}"
    }

    triggers {
        pollSCM "0 0 * * *"
    }

    tools {nodejs "NodeJS"}

    stages {
        stage("Build UI") {
            steps {
                dir("src/Blogifier") {
                    sh "dotnet publish Blogifier.csproj -o ../../outputs"
                }
            }
        }
        stage("Reset test environment") {
            steps {
                sh "docker-compose down"
                sh "docker-compose up -d --build"
                sh "mkdir -p ${SCREENSHOT_PATH}"
                sh "chmod a=rwx ${SCREENSHOT_PATH}"
            }
        }
        stage("Execute UI tests") {
            steps {
                echo "Find a way to let Jenkins execute your TestCafé tests here"
                sh "npm install testcafe testcafe-reporter-xunit"
                sh "node_modules/.bin/testcafe firefox:headless tests/ui/tests.js -r xunit:res.xml"
            }
            post {
                always {
                    archiveArtifacts artifacts: "${SCREENSHOT_PATH}/**", allowEmptyArchive: true
                }
            }
        }

        stage("performance test") {
            steps {
                dir("tests/k6") {
                    sh "k6 run -e URL=185.51.76.42:9888 sample_test.js"
                }
            }
        }
    }
}