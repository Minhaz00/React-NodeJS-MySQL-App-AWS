# Variables
DOCKER_USERNAME = minhaz71

# Frontend Variables
FRONTEND_IMAGE_NAME = React-frontend
FRONTEND_TAG = latest

# Backend Variables
BACKEND_IMAGE_NAME = Nodejs-backend
BACKEND_TAG = latest

# Frontend Commands

# Build the Docker image for the frontend
build-frontend:
	docker build -t $(FRONTEND_IMAGE_NAME) ./frontend

# Tag the Docker image for the frontend
tag-frontend:
	docker tag $(FRONTEND_IMAGE_NAME):$(FRONTEND_TAG) $(DOCKER_USERNAME)/$(FRONTEND_IMAGE_NAME):$(FRONTEND_TAG)

# Push the Docker image for the frontend
push-frontend:
	docker push $(DOCKER_USERNAME)/$(FRONTEND_IMAGE_NAME):$(FRONTEND_TAG)

# Combined command to build, tag, and push the frontend Docker image
all-frontend: build-frontend tag-frontend push-frontend

# Clean up local frontend images (optional)
clean-frontend:
	docker rmi $(FRONTEND_IMAGE_NAME):$(FRONTEND_TAG) $(DOCKER_USERNAME)/$(FRONTEND_IMAGE_NAME):$(FRONTEND_TAG)

# Backend Commands

# Build the Docker image for the backend
build-backend:
	docker build -t $(BACKEND_IMAGE_NAME) ./backend

# Tag the Docker image for the backend
tag-backend:
	docker tag $(BACKEND_IMAGE_NAME):$(BACKEND_TAG) $(DOCKER_USERNAME)/$(BACKEND_IMAGE_NAME):$(BACKEND_TAG)

# Push the Docker image for the backend
push-backend:
	docker push $(DOCKER_USERNAME)/$(BACKEND_IMAGE_NAME):$(BACKEND_TAG)

# Combined command to build, tag, and push the backend Docker image
all-backend: build-backend tag-backend push-backend

# Clean up local backend images (optional)
clean-backend:
	docker rmi $(BACKEND_IMAGE_NAME):$(BACKEND_TAG) $(DOCKER_USERNAME)/$(BACKEND_IMAGE_NAME):$(BACKEND_TAG)

# Clean up both frontend and backend images
clean: clean-frontend clean-backend

# Run all for both frontend and backend in parallel
all: frontend backend

.PHONY: build-frontend tag-frontend push-frontend all-frontend clean-frontend \
        build-backend tag-backend push-backend all-backend clean-backend clean all