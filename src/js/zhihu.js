import React from 'react';
import ReactDom from 'react-dom';
import '../less/app.less';

var SearchApp = React.createClass({
    render: function () {
        var nameArray = [];
        console.log(this.props.data);
        this.props.data.forEach(function (item, index) {
            nameArray.unshift(<span key={index}>{item.name}</span>);
        })
        return (
            <div className='search'>
                <input type="text"/>
                <span>您已经邀请{nameArray}等{nameArray.length}人</span>
            </div>
        )
    }
});

var ListItem = React.createClass({
    render: function () {
        var itemData = this.props.dataItem;
        var {name, id, bio, avatarUrl, canInvited} = itemData;
        var btnStyle = {};
        var text = '';

        if(canInvited) {
			btnStyle = Object.assign({}, btnStyle, {
				backgroundColor:'#8ab923'
			})
            text = '邀请回答';
        }else {
			btnStyle = Object.assign({}, btnStyle, {
				backgroundColor:'#f1f1f2'
			})
            text = '取消邀请';
        }
        return (
            <li className='itemLi'>
                <div className='content'>
                    <img src={'./src/img/' + avatarUrl}/>
                    <div><span>{name}</span></div>
                    <div><span>{bio}</span></div>
                    <button  style={btnStyle} onClick={() => { this.props.toggleItem(id) }}>{text}</button>
                </div>
            </li>
        )
    }
})
var ListTable = React.createClass({
    render: function () {
        var row = [];
        var _self = this;
        this.props.data.forEach(function (ele, index) {
            row.push(<ListItem toggleItem={_self.props.toggleItem} key={index} dataItem={ele}></ListItem>);
        })
        return (
            <div className='itemWrapper'>
                <ul>
                    {row}
                </ul>
            </div>
        )
    }
});

var App = React.createClass({
    getInitialState: function () {
        return {
            // 记录邀请的顺序
            invitedList: [],
            // 记录下拉列表的人是否邀请过
            list: [],
            filterText: ''
        }
    },  
    componentDidMount: function () {
        var data = this.props.data;
        var list = [];
        var _self = this;
        data.forEach(function (item) {
            item.canInvited = true;
            list.push(item);
            _self.setState({
                list: list
            }) 
        })
    },
    toggleItem: function (id) {
        var list = this.state.list;
        var newInvitedList = [...this.state.invitedList];
        list = list.map(function (item, index) {
            if (item.id === id) {
                item.canInvited = !item.canInvited;
            }
            return item;
        });
        this.setState({
            list: list
        });

        // 查看点击了哪一个   如果不这么做的话那么点击添加的顺序就是上面list数据里的顺序
        list.forEach(function (ele, index) {
            if (ele.id === id) {
                // canInvited 为false证明 已经被邀请我们要 添加数组里
                if (!ele.canInvited) {
                    console.log('jia  k')
                    newInvitedList.push(ele);
                }else {
                    // 反之删除
                    console.log('---')
                    newInvitedList = newInvitedList.filter(function (ele, index) {
                        return ele.id !== id;
                    })
                }
            }
        });

        this.setState({
            invitedList: newInvitedList
        });
    },
    render: function () {
        return (
            <div className='wrapper'>
                <SearchApp data={this.state.invitedList}></SearchApp>

                <ListTable data={this.props.data} toggleItem={this.toggleItem}></ListTable>
            </div>
        )
    }
});


const data =  [
    {
      "name": "magasa",
      "slug": "magasa",
      "avatarUrl": "./user_avatar_1.png",
      "bio": "电影杂志《虹膜》主编（支持iOS/Android平台）",
      "id": 1
    },
    {
      "name": "程毅南",
      "slug": "cheng-yi-nan",
      "avatarUrl": "./user_avatar_2.png",
      "bio": "美国心理学和经济学本科毕业。强推《知识分子与社会》",
      "id": 2
    },
    {
      "name": "田吉顺",
      "slug": "tian-ji-shun",
      "avatarUrl": "./user_avatar_3.png",
      "bio": "妇产科医生",
      "id": 3
    },
    {
      "name": "周源",
      "slug": "zhouyuan",
      "avatarUrl": "./user_avatar_4.png",
      "bio": "知乎 001 号员工",
      "id": 4
    },
    {
      "name": "黄继新",
      "slug": "jixin",
      "avatarUrl": "./user_avatar_5.png",
      "bio": "和知乎在一起",
      "id": 5
    },
    {
      "name": "李申申",
      "slug": "shen",
      "avatarUrl": "./user_avatar_6.png",
      "bio": "知乎 002 号员工",
      "id": 6
    },
    {
      "name": "Raymond Wang",
      "slug": "raymond-wang",
      "avatarUrl": "./user_avatar_7.png",
      "bio": "lawyer",
      "id": 7
    }
]


ReactDom.render(
    <App data={data}></App>,
    document.getElementById('root')
)