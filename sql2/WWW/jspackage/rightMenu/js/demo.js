var countryTree = (function(countryTree) {
    var tree = {
        zTree: '',
        pNode: '',
        setting: {
            isSimpleData: true,
            treeNodeKey: "id",
            treeNodeParentKey: "pid",
            showLine: true,
            root: {
                isRoot: true,
                nodes: []
            },
            callback: {
                rightClick: function(event, treeId, treeNode) {
                    tree.pNode = treeNode;
                    tree.showRightMenu({ //显示右键菜单
                        x: event.clientX,
                        y: event.clientY
                    });
                }
            }
        },
        init: {
            initEvent: {
                initRMenu: function() {
                    $("#rMenu").hover(function() { //设置进入右键菜单事件
                        tree.bindClick($("#r_addFolder"), function() {
                            tree.addFolder();
                        });

                        tree.bindClick($("#r_addNode"), function() {
                            tree.addNode();
                        });

                        tree.bindClick($("#r_updateNode"), function() {
                            tree.updateNode();
                        });

                        tree.bindClick($("#r_deleteNode"), function() {
                            tree.deleteNode();
                        });
                    }, function() { //设置离开右键菜单事件
                        tree.hideItem();
                    });
                }
            }
        },
        loadTree: function() { //加载树
            var nodes;
            $.ajax({
                url:"../../bcd/php/setcms.php?itype=2&id=100002",
                type:"get",
                dataType:"json",
                async:false,
                data:"" ,
                success:function (res) {
                    nodes=res;
                }
            });
            // var nodes = [{
            //     id: 1,
            //     pid: 0,
            //     name: "中国",
            //     open: true
            // }, {
            //     id: 11,
            //     pid: 1,
            //     name: "北京",
            //     isParent: true
            // }, {
            //     id: 111,
            //     pid: 11,
            //     name: "海淀"
            // }, {
            //     id: 12,
            //     pid: 1,
            //     name: "河南"
            // }, {
            //     id: 121,
            //     pid: 12,
            //     name: "郑州",
            //     isParent: true
            // }];
            tree.zTree = $("#tree").zTree(tree.setting, nodes);
        },
        showRightMenu: function(postionJson) {
            $("#rMenu").css({ //设置右键菜单的位置
                top: postionJson.y + "px",
                left: postionJson.x + 2 + "px",
                display: "block"
            });
            if(tree.pNode.id == 1) { //如果是根节点则禁用“删除”、“修改名称”选项
                tree.showItem(["#r_addFolder", "#r_addNode"]);
            } else if(tree.pNode.isParent) { //如果是文件夹节点，则显示所有菜单选项
                tree.showItem(["#r_addFolder", "#r_addNode", "#r_updateNode", "#r_deleteNode"]);
            } else { //此选项为节点，则禁用“增加节点”、“增加文件夹”选项
                tree.showItem(["#r_deleteNode", "#r_updateNode"]);
            }
            tree.init.initEvent.initRMenu(); //加载菜单选项的事件
        },
        showItem: function(itemArray) { //显示某些域
            for(var i = 0; i < itemArray.length; i++) {
                $(itemArray[i]).show();
            }
        },
        hideItem: function(itemArray) { //隐藏某些域
            if(itemArray == undefined) { //如果为传入值，则禁用缺省的域
                tree.hideItem(["#rMenu", "#r_addFolder", "#r_addNode", "#r_updateNode", "#r_deleteNode"]);
            }
            for(var i = 0; i < itemArray.length; i++) {
                $(itemArray[i]).hide();
            }
        },
        addFolder: function() { //添加文件夹节点
            var folderName = window.prompt("请输入文件夹的名称");
            if(folderName == "") {
                alert("操作失败！文件夹的名称不能为空!");
            } else {
                if(folderName != null) {
                    tree.zTree.addNodes(tree.pNode, [{ //添加节点
                        id: tree.createNodeId(),
                        pId: tree.pNode.id,
                        name: folderName,
                        isParent: true
                    }]);
                }
            }
        },
        addNode: function() { //添加节点
            var nodeName = window.prompt("请输入节点名称");
            if(nodeName == "") {
                alert("操作失败！节点名称不能为空!");
            } else {
                if(nodeName != null) {
                    tree.zTree.addNodes(tree.pNode, [{ //添加节点
                        id: tree.createNodeId(),
                        pId: tree.pNode.id,
                        name: nodeName,
                        isParent: false
                    }]);
                }
            }
        },
        updateNode: function() { //更新节点-修改节点名称
            var newName = window.prompt("输入新名称", tree.pNode.name);
            if(newName != tree.pNode.name && newName != null && newName != undefined) {
                tree.pNode.name = newName;
                tree.zTree.updateNode(tree.pNode, true);
            }
        },
        deleteNode: function() { //删除节点
            if(tree.pNode.isParent) { //判断该节点是否是文件夹节点，并且检查是否有子节点
                if(window.confirm("如果删除将连同子节点一起删掉。请确认！")) {
                    var parentNode = tree.zTree.getNodeByParam("id", tree.pNode.pid); //获取父节点对象
                    tree.zTree.removeNode(tree.pNode); //移除节点
                    parentNode.isParent = true; //设置父节点为文件夹节点
                    tree.zTree.refresh();
                }
            } else { //该节点为不是文件夹节点
                if(window.confirm("确认要删除?")) {
                    var parentNode = tree.zTree.getNodeByParam("id", tree.pNode.pid);
                    tree.zTree.removeNode(tree.pNode); //移除节点
                    parentNode.isParent = true; //设置父节点为文件夹节点
                    tree.zTree.refresh();
                }
            }
        },
        createNodeId: function() { //动态生成节点id。生成策略：在父节点id后追加递增数字
            var nodes = tree.zTree.getNodesByParam("pid", tree.pNode.id);
            if(nodes.length == 0) { //生成id的算法
                return tree.pNode.id + "1";
            } else {
                return nodes[nodes.length - 1].id + 1;
            }
        },
        bindClick: function(obj, fn) { //绑定click事件
            obj.unbind("click");
            obj.bind("click", fn);
        }
    };
    return { //此处为公开的数据
        loadTree: function() {
            tree.loadTree();
        }
    };
})(countryTree);

$().ready(function() {
    countryTree.loadTree();
});