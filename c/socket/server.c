#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main(int argc, char const *argv[]) {
	const int BUFF_LEN = 4096;
	char buff[BUFF_LEN];
	int serverfd = socket(AF_INET, SOCK_STREAM, 0);

	struct sockaddr_in serv_addr;
	bzero((char*)&serv_addr, sizeof(serv_addr));

	int portno = atoi(argv[1]);
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_port = htons(portno);
	serv_addr.sin_addr.s_addr = INADDR_ANY;

	bind(serverfd, (struct sockaddr*)&serv_addr, sizeof(serv_addr));
	listen(serverfd, 10);
	while (1) {
		bzero(buff, BUFF_LEN);

		int connfd = accept(serverfd, NULL, NULL);

		int n = recv(connfd, buff, BUFF_LEN, 0);
		printf("%s\n", buff);
	}
	return 0;
}
