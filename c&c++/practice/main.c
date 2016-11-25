#include <stdio.h>

#include "btree.h"
// #include "queue.h"

int main()
{
    struct BTree *tree = createTree();
    addTree(tree, 10);
    addTree(tree, 1);
    addTree(tree, 12);
    addTree(tree, 3);
    addTree(tree, 7);
    printTree(tree);
    destoryTree(tree);

    return 0;
}