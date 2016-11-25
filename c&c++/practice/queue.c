#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "queue.h"
#include "define.h"

struct Queue *createQueue(int dataSize)
{
    struct Queue *queue = malloc(sizeof(struct Queue));
    queue->head = NULL;
    queue->last = NULL;

    queue->dataSize = dataSize;
    return queue;
}

void enque(struct Queue *queue, void *data)
{
    struct QueueNode *node = malloc(sizeof(struct QueueNode));
    node->next = NULL;
    node->data = malloc(sizeof(*data));

    // printf("%lu\n", sizeof(*data));
    memcpy(node->data, data, queue->dataSize);

    if (queue->head == NULL)
    {
        queue->head = node;
    }
    else
    {
        queue->last->next = node;
    }
    queue->last = node;
}
int deque(struct Queue *queue, void *data)
{
    if (queue->head == NULL)
        return False;
    struct QueueNode *node = queue->head;
    queue->head = node->next;

    memcpy(data, node->data, queue->dataSize);

    free(node);

    if (queue->head == NULL)
        queue->last = NULL;

    return True;
}

int queueSize(struct Queue *queue)
{
    struct QueueNode *node = queue->head;

    int count = 0;
    while (node != NULL)
    {
        count++;
        node = node->next;
    }

    return count;
}

int destoryQueue(struct Queue *queue)
{
    struct QueueNode *node = NULL;
    while (queue->head != NULL)
    {
        node = queue->head;
        queue->head = node->next;
        free(node->data);
        free(node);
    }

    free(queue);
    return True;
}