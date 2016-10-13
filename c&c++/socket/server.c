#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <error.h>

#define  BUFF_LEN 4096

int main(int argc, char const *argv[]) {
	char buff[BUFF_LEN];

	if(argc < 2){
		fprintf(stderr, "no port provided\n");
		exit(1);
	}

	int serverfd = socket(AF_INET, SOCK_STREAM, 0);
	if(serverfd < 0){
		fprintf(stderr, "ERROR opening socket\n");
		exit(1);
	}

	struct sockaddr_in serv_addr;
	bzero((char*)&serv_addr, sizeof(serv_addr));

	int portno = atoi(argv[1]);
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_port = htons(portno);
	serv_addr.sin_addr.s_addr = INADDR_ANY;

	if(bind(serverfd, (struct sockaddr*)&serv_addr, sizeof(serv_addr)) < 0){
		fprintf(stderr, "ERROR on binding\n");
		exit(1);
	}
	listen(serverfd, 10);
	while (1) {
		bzero(buff, BUFF_LEN);

		int connfd = accept(serverfd, NULL, NULL);
		if(connfd < 0){
			fprintf(stderr, "ERROR on accept\n");
			exit(1);
		}

		int n = read(connfd, buff, BUFF_LEN);
		if(n < 0){
			fprintf(stderr, "ERROR reading from socker\n");
			exit(1);
		}
		printf("%s\n", buff);
	}
	return 0;
}
