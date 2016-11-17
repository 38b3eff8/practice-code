#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *left;
    struct Node *right;
};

struct Node *initNode(int data)
{
    struct Node *node = malloc(sizeof(struct Node));
    node->left = NULL;
    node->right = NULL;

    node->data = data;

    return node;
}

struct Node *createTree(int data)
{
    struct Node *root = initNode(data);
    return root;
}

void destoryTree(struct Node *root)
{
    if (root == NULL)
        return;
    destoryTree(root->left);
    destoryTree(root->right);

    free(root);
}

void printTree(struct Node *root)
{
    if (root == NULL)
        return;
    printf("%d ", root->data);
    printTree(root->left);
    printTree(root->right);
}

void add(struct Node *root, int data)
{
    if (root->data == data)
        return;
    else if (root->data < data)
    {
        if (root->left == NULL)
            root->left = initNode(data);
        else
            add(root->left, data);
    }
    else
    {
        if (root->right == NULL)
            root->right = initNode(data);
        else
            add(root->right, data);
    }
}

int main()
{
    struct Node *root = createTree(10);
    add(root, 1);
    printTree(root);
    printf("\n");
    destoryTree(root);
    return 0;
}