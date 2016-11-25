#include <stdio.h>
#include <stdlib.h>

#include "btree.h"
#include "queue.h"
#include "define.h"

struct TreeNode *initTreeNode(int data)
{
    struct TreeNode *node = malloc(sizeof(struct TreeNode));
    node->left = NULL;
    node->right = NULL;

    node->data = data;

    return node;
}

struct BTree *createTree()
{
    struct BTree *tree = malloc(sizeof(struct BTree));
    tree->root = NULL;
    return tree;
}

void destory(struct TreeNode *root)
{
    if (root == NULL)
        return;
    destory(root->left);
    destory(root->right);

    free(root);
}

void destoryTree(struct BTree *tree)
{
    destory(tree->root);
    free(tree);
}

void print(struct TreeNode *root)
{
    if (root == NULL)
        return;

    print(root->left);
    printf("%d ", root->data);
    print(root->right);
}

void printTree(struct BTree *tree)
{
    print(tree->root);
    printf("\n");
}

void add(struct TreeNode *root, int data)
{
    if (root->data == data)
        return;
    else if (root->data > data)
    {
        if (root->left == NULL)
            root->left = initTreeNode(data);
        else
            add(root->left, data);
    }
    else
    {
        if (root->right == NULL)
            root->right = initTreeNode(data);
        else
            add(root->right, data);
    }
}

void addTree(struct BTree *tree, int data)
{
    if (tree->root == NULL)
    {
        tree->root = initTreeNode(data);
        return;
    }
    add(tree->root, data);
}

int find(struct TreeNode *root, int data)
{
    if (root == NULL)
        return False;
    if (root->data == data)
        return True;

    if (data > root->data)
        return find(root->left, data);

    return find(root->right, data);
}

int findTree(struct BTree *tree, int data)
{
    return find(tree->root, data);
}
