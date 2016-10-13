#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(){
	pid_t id;
	int i = 0;

	printf("start fork\n");
	id = fork();
	i++;
	printf("end fork\n");

	if(id < 0) {
		perror("fork failed\n");
		exit(1);
	}else if(id == 0) {
		printf("In child\n");
		printf("i=%d\n", i++);
		exit(0);
	}else{
		printf("In father\n");
		printf("i = %d\n", i++);
		exit(0);
	}
	return 0;
}
