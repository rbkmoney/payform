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
BASE_IMAGE_TAG := 2b4570bc1d9631c10aaed2132eb87eb9003f3471

BUILD_IMAGE_TAG := 903ec30497023cef050d8f281ac0bfad668dc5f4

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
	npm install @cyclonedx/bom
	node_modules/.bin/cyclonedx-bom -o bom.xml

check:
	npm run check

test:
	npm test

build:
	npm run build

clean:
	rm -rf dist
