#!groovy

build('payform', 'docker-host') {
  checkoutRepo()
  loadBuildUtils()

  def pipeDefault
  def withWsCache
  runStage('load pipeline') {
    env.JENKINS_LIB = "build_utils/jenkins_lib"
    pipeDefault = load("${env.JENKINS_LIB}/pipeDefault.groovy")
    withWsCache = load("${env.JENKINS_LIB}/withWsCache.groovy")
  }

  def pipeline = {
    runStage('init') {
      withGithubSshCredentials {
        sh 'make wc_init'
      }
    }
    runStage('test') {
      withGithubSshCredentials {
        sh "make wc_cmd WC_CMD='(which cyclonedx-bom || npm install @cyclonedx/bom) && PATH=$$PATH:$$(pwd)/node_modules/@cyclonedx/bom/bin/ cyclonedx-bom -o bom.xml'"
      }
    }

    runStage('check') {
      sh 'make wc_check'
    }
    runStage('test') {
      sh 'make wc_test'
    }
    runStage('build') {
      sh 'make wc_build'
    }
    runStage('build image') {
      sh 'make build_image'
    }

    try {
      if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME.startsWith('epic')) {
        runStage('push image') {
          sh 'make push_image'
        }
      }
    } finally {
      runStage('rm local image') {
        sh 'make rm_local_image'
      }
    }
  }
  pipeDefault(pipeline)
}
