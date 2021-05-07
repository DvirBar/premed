build:
	cd client && ${MAKE} build
	cd server && ${MAKE} build
	# cd seed && ${MAKE} build
	
run:
	docker-compose -f docker-compose.yml up
