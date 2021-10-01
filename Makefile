SUBMODULES = build_utils
SUBTARGETS = $(patsubst %,%/.git,$(SUBMODULES))

UTILS_PATH := build_utils
TEMPLATES_PATH := .

# Name of the service
SERVICE_NAME := payform
# Service image default tag
SERVICE_IMAGE_TAG ?= $(shell git rev-parse HEAD)
# The tag for service image to be pushed with
SERVICE_IMAGE_PUSH_TAG ?= $(SERVICE_IMAGE_TAG)

REGISTRY ?= dr2.rbkmoney.com

# Base image for the service
BASE_IMAGE_NAME := service-fe
BASE_IMAGE_TAG := 647d66a59ba89ea42b326ca5156f5d1e1395febc

BUILD_IMAGE_TAG := 25c031edd46040a8745334570940a0f0b2154c5c

GIT_SSH_COMMAND :=
DOCKER_RUN_OPTS = -e GIT_SSH_COMMAND='$(GIT_SSH_COMMAND)' -e NPM_TOKEN='$(GITHUB_TOKEN)' -e SENTRY_AUTH_TOKEN='$(SENTRY_AUTH_TOKEN)'

CALL_W_CONTAINER := init check test build clean submodules

.PHONY: $(CALL_W_CONTAINER)

all: build

-include $(UTILS_PATH)/make_lib/utils_image.mk
-include $(UTILS_PATH)/make_lib/utils_container.mk

$(SUBTARGETS): %/.git: %
	git submodule update --init $<
	touch $@

submodules: $(SUBTARGETS)

init:
	npm i

check:
	npm run check

test:
	npm test

build:
	SENTRY_AUTH_TOKEN=$(SENTRY_AUTH_TOKEN) npm run build

build_pr:
	npm run build

clean:
	rm -rf dist
