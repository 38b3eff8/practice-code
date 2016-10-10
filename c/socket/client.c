#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <string.h>
#include <unistd.h>

#define BUFF_LEN 4096

int main(int argc, char const *argv[]) {
	char buff[BUFF_LEN];
	if (argc < 3) {
		fprintf(stderr,"usage %s hostname port\n", argv[0]);
		exit(0);
	}
	struct hostent * server = gethostbyname(argv[1]);
	if(server == NULL){
		fprintf(stderr, "ERROR, no such host\n");
		exit(0);
	}
	int portno = atoi(argv[2]);

    int clientfd = socket(AF_INET, SOCK_STREAM, 0);
	if (clientfd < 0){
		fprintf(stderr, "ERROR opening socket\n");
		exit(1);
	}
    struct sockaddr_in serv_addr;

    bzero((char*)&serv_addr, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    bcopy((char *)server->h_addr, (char *)&serv_addr.sin_addr.s_addr, server->h_length);
    serv_addr.sin_port = htons(portno);

	if(connect(clientfd, (const struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0){
		fprintf(stderr, "ERROR connecting\n");
		exit(1);
	}

	printf("Please enter the message: ");
	bzero(buff, BUFF_LEN);
	fgets(buff, BUFF_LEN, stdin);
	int n = write(clientfd, buff, BUFF_LEN);
	if(n < 0){
		fprintf(stderr, "ERROR writing to socket\n");
	}

    return 0;
}
