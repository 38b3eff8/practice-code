#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main(int argc, char const *argv[]) {
	const int BUFF_LEN = 4096;
    int clientfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in serv_addr;
    struct hostent * server = gethostbyname(argv[1]);
    char buff[BUFF_LEN];
    int portno = atoi(argv[2]);

	return 0;
}
