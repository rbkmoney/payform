#!/bin/bash
cat <<EOF
FROM $BASE_IMAGE
MAINTAINER Ildar Galeev <i.galeev@rbkmoney.com>
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/vhosts.d/payform.conf
EXPOSE 8080
LABEL base_image_tag=$BASE_IMAGE_TAG
LABEL build_image_tag=$BUILD_IMAGE_TAG
# A bit of magic to get a proper branch name
# even when the HEAD is detached (Hey Jenkins!
# BRANCH_NAME is available in Jenkins env).
LABEL branch=$( \
  if [ "HEAD" != $(git rev-parse --abbrev-ref HEAD) ]; then \
    echo $(git rev-parse --abbrev-ref HEAD); \
  elif [ -n "$BRANCH_NAME" ]; then \
    echo $BRANCH_NAME; \
  else \
    echo $(git name-rev --name-only HEAD); \
  fi)
LABEL commit=$(git rev-parse HEAD)
LABEL commit_number=$(git rev-list --count HEAD)
EOF
