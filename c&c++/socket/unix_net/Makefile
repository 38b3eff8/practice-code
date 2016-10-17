all: timecli.out timesrv.out

timecli.out: daytimetcpcli.c
	gcc daytimetcpcli.c -o timecli.out

timesrv.out: daytimetcpsrv.c wrap_func.c
	gcc daytimetcpsrv.c wrap_func.c -o timesrv.out

clean:
	rm *.out