#ifndef __BTREE_H__
#define __BTREE_H__

struct TreeNode
{
  int data;
  struct TreeNode *left;
  struct TreeNode *right;
};

struct BTree
{
  struct TreeNode *root;
};

struct TreeNode *initTreeNode(int data);

struct BTree *createTree();

void destoryTree(struct BTree *tree);

void printTree(struct BTree *tree);

void addTree(struct BTree *tree, int data);

int findTree(struct BTree *tree, int data);

#endif