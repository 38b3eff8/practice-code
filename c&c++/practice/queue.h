#ifndef __QUEUE_H__
#define __QUEUE_H__
struct QueueNode
{
    void *data;
    struct QueueNode *next;
};

struct Queue
{
    struct QueueNode *head;
    struct QueueNode *last;
    int dataSize;
};

struct Queue *createQueue(int dataSize);

void enque(struct Queue *queue, void *data);
int deque(struct Queue *queue, void *data);

int queueSize(struct Queue *queue);

int destoryQueue(struct Queue *queue);

#endif
