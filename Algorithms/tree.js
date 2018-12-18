// Деревья (алгоритма)
// https://sohabr.net/habr/post/232669/
// https://habr.com/post/267855/

const tree = {
    title: 'a',
    left: {
        title: 'b',
        left: {
            title: 'd',
            left: {
                title: 'h',
                left: null,
                right: null
            },
            right: {
                title: 'i',
                left: null,
                right: null
            }
        },
        right: {
            title: 'e',
            left: null,
            right: null
        }
    },
    right: {
        title: 'c',
        left: {
            title: 'f',
            left: null,
            right: null
        },
        right: {
            title: 'g',
            left: {
                title: 'j',
                left: null,
                right: null
            },
            right: null
        }
    }
}

// Обход в глубину
// goTreeHeight(tree);

function goTreeHeight(tree) {
    // если вывод тут, то прямой обход
    console.log(tree.title);

    if (tree.left) {
        goTreeHeight(tree.left);
    }

    // если вывод тут, то симметричный обход
    // console.log(tree.title);

    if (tree.right) {
        goTreeHeight(tree.right);
    }

    // если вывод тут, то обратный обход
    // console.log(tree.title);
}

// обход бинарного девера в ширину
// goTreeWidth(tree);

function goTreeWidth(tree) {
    var queue = [];
    queue.push(tree);

    while (queue.length !== 0) {
        var x = queue[0];

        if (x.left) {
            queue.push(x.left);
        }
        if (x.right)
            queue.push(x.right);

        console.log(x.title.toUpperCase());
        queue.shift();
    }
}