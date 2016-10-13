# Redux 入门教程

![cover][1]

## 你可能不需要 Redux
如果你的UI层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。

- 用户的使用方式非常简单
- 用户之间没有协作
- 不需要与服务器大量交互，也没有使用 WebSocket
- 视图层（View）只从单一来源获取数据

上面这些情况，都不需要使用 Redux。

- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了WebSocket
- View要从多个来源获取数据

上面这些情况才是 Redux 的适用场景：多交互、多数据源。从组件角度看，如果你的应用有以下场景，可以考虑使用 Redux。

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

发生上面情况时，如果不使用 Redux 或者其他状态管理工具，不按照一定规律处理状态的读写，代码很快就会变成一团乱麻。你需要一种机制，可以在同一个地方查询状态、改变状态、传播状态的变化。

## Redux 与 Flux
[Redux][2] 把自己标榜为一个“可预测的状态容器”，其实也是 Flux 里面“单向数据流”的思想，只是它充分利用函数式的特性，让整个实现更加优雅纯粹，使用起来也更简单。

    Redux(oldState) => newState

### 进化 Flux
我们可以先通过对比 Redux 和 Flux 的实现来感受一下 Redux 带来的惊艳。首先是 action creators，Flux 是直接在 action 里面调用 dispatch：

```javascript
export function addTodo(text) {
  AppDispatcher.dispatch({
    type: ActionTypes.ADD_TODO,
    text: text
  });
}
```

Redux 把它简化成了这样：

```javascript
export function addTodo(text) {
  return {
    type: ActionTypes.ADD_TODO,
    text: text
  };
}
```

这一步把 dispatcher 和 action 解藕了，很快我们就能看到它带来的好处。

接下来是 Store，这是 Flux 里面的 Store：

```javascript
let _todos = [];
const TodoStore = Object.assign(new EventEmitter(), {
  getTodos() {
    return _todos;
  }
});
AppDispatcher.register(function (action) {
  switch (action.type) {
  case ActionTypes.ADD_TODO:
    _todos = _todos.concat([action.text]);
    TodoStore.emitChange();
    break;
  }
});
export default TodoStore;

```

Redux 把它简化成了这样：

```javascript
const initialState = { todos: [] };
export default function TodoStore(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.ADD_TODO:
    return { todos: state.todos.concat([action.text]) };
  default:
    return state;
}
```

同样把 dispatch 从 Store 里面剥离了，Store 变成了一个 pure function：(state, action) => state

#### 什么是 pure function
如果一个函数没有任何副作用（side-effects)，不会影响任何外部状态，对于任何一个相同的输入（参数），无论何时调用这个函数总是返回同样的结果，这个函数就是一个 pure function。所谓 side-effects 就是会改变外部状态的因素 ，比如 Ajax 请求就有 side-effects，因为它带来了不确定性。

所以现在 Store 不再拥有状态，而只是管理状态，所以首先要明确一个概念，Store 和 State 是有区别的，Store 并不是一个简单的数据结构，State 才是，Store 会包含一些方法来管理 State，比如获取／修改 State。

基于这样的 Store，可以做很多扩展，这也是 Redux 强大之处。

来源：[The Evolution of Flux Frameworks][3]

### Redux 的基础概念
#### 三个基本原则

1. 整个应用只有唯一一个可信数据源，也就是只有一个 Store
2. State 只能通过触发 Action 来更改
3. State 的更改必须写成纯函数，也就是每次更改总是返回一个新的 State，在 Redux 里这种函数称为 Reducer

#### Actions
Action 很简单，就是一个单纯的包含 { type, payload } 的对象，type 是一个常量用来标示动作类型，payload 是这个动作携带的数据。Action 需要通过 store.dispatch() 方法来发送。

比如一个最简单的 action：

```javascript
{
  type: 'ADD_TODO',
  text: 'Build my first Redux app'
}
```

一般来说，会使用函数（Action Creators）来生成 action，这样会有更大的灵活性，Action Creators 是一个 pure function，它最后会返回一个 action 对象：

```javascript
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}
```

所以现在要触发一个动作只要调用 dispatch: dispatch(addTodo(text))

稍后会讲到如何拿到 store.dispatch

#### Reducers
Reducer 用来处理 Action 触发的对状态树的更改。

所以一个 reducer 函数会接受 oldState 和 action 两个参数，返回一个新的 state：(oldState, action) => newState。一个简单的 reducer 可能类似这样：

```javascript
const initialState = {
  a: 'a',
  b: 'b'
};

function someApp(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_A':
      return { ...state, a: 'Modified a' };
    case 'CHANGE_B':
      return { ...state, b: action.payload };
    default:
      return state
  }
}
```

值得注意的有两点：

1. 我们用到了 [object spread语法][4] 确保不会更改到 oldState 而是返回一个 newState
2. 对于不需要处理的 action，直接返回 oldState

Reducer 也是 pure function，这点非常重要，所以绝对不要在 reducer 里面做一些引入 side-effects 的事情，比如：

- 直接修改 state 参数对象
- 请求 API
- 调用不纯的函数，比如 Data.now() Math.random()

因为 Redux 里面只有一个 Store，对应一个 State 状态，所以整个 State 对象就是由一个 reducer 函数管理，但是如果所有的状态更改逻辑都放在这一个 reducer 里面，显然会变得越来越巨大，越来越难以维护。得益于纯函数的实现，我们只需要稍微变通一下，让状态树上的每个字段都有一个 reducer 函数来管理就可以拆分成很小的 reducer 了：

```javascript
function someApp(state = {}, action) {
  return {
    a: reducerA(state.a, action),
    b: reducerB(state.b, action)
  };
}
```

对于 reducerA 和 reducerB 来说，他们依然是形如：(oldState, action) => newState 的函数，只是这时候的 state 不是整个状态树，而是树上的特定字段，每个 reducer 只需要判断 action，管理自己关心的状态字段数据就好了。

Redux 提供了一个工具函数 combineReducers 来简化这种 reducer 合并：

```javascript
import { combineReducers } from 'redux';

const someApp = combineReducers({
  a: reducerA,
  b: reducerB
});
```

如果 reducer 函数名字和字段名字相同，利用 ES6 的 Destructuring 可以进一步简化成：combineReducers({ a, b })

象 someApp 这种管理整个 State 的 reducer，可以称为 `root reducer`。

#### Store
现在有了 Action 和 Reducer，Store 的作用就是连接这两者，Store 的作用有这么几个：

- Hold 住整个应用的 State 状态树
- 提供一个 getState() 方法获取 State
- 提供一个 dispatch() 方法发送 action 更改 State
- 提供一个 subscribe() 方法注册回调函数监听 State 的更改

创建一个 Store 很容易，将 root reducer 函数传递给 createStore 方法即可：

```javascript
import { createStore } from 'redux';
import someApp from './reducers';
let store = createStore(someApp);

// 你也可以额外指定一个初始 State（initialState），这对于服务端渲染很有用
// let store = createStore(someApp, window.STATE_FROM_SERVER);
```

现在我们就拿到了 store.dispatch，可以用来分发 action 了：

```javascript
let unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch
store.dispatch({ type: 'CHANGE_A' });
store.dispatch({ type: 'CHANGE_B', payload: 'Modified b' });

// Stop listening to state updates
unsubscribe();
```

#### Data Flow
以上提到的 store.dispatch(action) -> reducer(state, action) -> store.getState() 其实就构成了一个“单向数据流”，我们再来总结一下。

##### 1. 调用 store.dispatch(action)

Action 是一个包含 { type, payload } 的对象，它描述了“发生了什么”，比如：

```javascript
{ type: 'LIKE_ARTICLE', articleID: 42 }
{ type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
{ type: 'ADD_TODO', text: 'Read the Redux docs.' }
```

你可以在任何地方调用 store.dispatch(action)，比如组件内部，Ajax 回调函数里面等等。

##### 2. Action 会触发给 Store 指定的 root reducer

root reducer 会返回一个完整的状态树，State 对象上的各个字段值可以由各自的 reducer 函数处理并返回新的值。

- reducer 函数接受 (state, action) 两个参数
- reducer 函数判断 action.type 然后处理对应的 action.payload 数据来更新并返回一个新的 state

##### 3. Store 会保存 root reducer 返回的状态树

新的 State 会替代旧的 State，然后所有 store.subscribe(listener) 注册的回调函数会被调用，在回调函数里面可以通过 store.getState() 拿到新的 State。

这就是 Redux 的运作流程，接下来看如何在 React 里面使用 Redux。

### 在 React 应用中使用 Redux
和 Flux 类似，Redux 也是需要注册一个回调函数 store.subscribe(listener) 来获取 State 的更新，然后我们要在 listener 里面调用 setState() 来更新 React 组件。

Redux 官方提供了 [react-redux][5] 来简化 React 和 Redux 之间的绑定，不再需要像 Flux 那样手动注册／解绑回调函数。

接下来看一下是怎么做到的，react-redux 只有两个 API

#### <Provider>
`<Provider>` 作为一个容器组件，用来接受 Store，并且让 Store 对子组件可用，用法如下：

```javascript
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

这时候 `<Provider>` 里面的子组件 `<App />` 才可以使用 connect 方法关联 store。

[`<Provider>`][6] 的实现很简单，他利用了 React 一个（暂时）隐藏的特性 Contexts，Context 用来传递一些父容器的属性对所有子孙组件可见，在某些场景下面避免了用 props 传递多层组件的繁琐，要想更详细了解 Contexts 可以参考[这篇文章][7]。

#### Connect
connect() 这个方法略微复杂一点，主要是因为它的用法非常灵活：connect([mapStateToProps], mapDispatchToProps], [mergeProps], [options])，它最多接受4个参数，都是可选的，并且这个方法调用会返回另一个函数，这个返回的函数来接受一个组件类作为参数，最后才返回一个和 Redux store 关联起来的新组件，类似这样：

```javascript
class App extends Component { ... }

export default connect()(App);
```

这样就可以在 App 这个组件里面通过 props 拿到 Store 的 dispatch 方法，但是注意现在的 App 没有监听 Store 的状态更改，如果要监听 Store 的状态更改，必须要指定 mapStateToProps 参数。

先来看它的参数：

- [mapStateToProps(state, [ownProps]): stateProps]: 第一个可选参数是一个函数，只有指定了这个参数，这个关联（connected）组件才会监听 Redux Store 的更新，每次更新都会调用 mapStateToProps 这个函数，返回一个字面量对象将会合并到组件的 props 属性。 ownProps 是可选的第二个参数，它是传递给组件的 props，当组件获取到新的 props 时，ownProps 都会拿到这个值并且执行 mapStateToProps 这个函数。
- [mapDispatchProps(dispatch, [ownProps]): dispatchProps]: 这个函数用来指定如何传递 dispatch 给组件，在这个函数里面直接 dispatch action creator，返回一个字面量对象将会合并到组件的 props 属性，这样关联组件可以直接通过 props 调用到 action， Redux 提供了一个 [bindActionCreators()][8] 辅助函数来简化这种写法。 如果省略这个参数，默认直接把 dispatch 作为 props 传入。ownProps 作用同上。

剩下的两个参数比较少用到，更详细的说明参看[官方文档][9]，其中提供了很多简单清晰的用法示例来说明这些参数。

#### 一个具体一点的例子
Redux 创建 Store，Action，Reducer 这部分就省略了，这里只看 react-redux 的部分。

```javascript
import React, { Component } from 'react';
import someActionCreator from './actions/someAction';
import * as actionCreators from './actions/otherAction';

function mapStateToProps(state) {
  return {
    propName: state.propName
  };
}

function mapDispatchProps(dispatch) {
  return {
    someAction: (arg) => dispatch(someActionCreator(arg)),
    otherActions: bindActionCreators(actionCreators, dispatch)
  };
}

class App extends Component {
  render() {
    // `mapStateToProps` 和 `mapDispatchProps` 返回的字段都是 `props`
    const { propName, someAction, otherActions } = this.props;
    return (
      <div onClick={someAction.bind(this, 'arg')}>
        {propName}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(App);
```

如前所述，这个 connected 的组件必须放到 <Provider> 的容器里面，当 State 更改的时候就会自动调用 mapStateToProps 和 mapDispatchProps 从而更新组件的 props。 组件内部也可以通过 props 调用到 action，如果没有省略了 mapDispatchProps，组件要触发 action 就必须手动 dispatch，类似这样：this.props.dispatch(someActionCreator('arg'))。

## 例子
所有的例子在[目录redux-demo][10]，说明文件[Examples.md][11]。

## 参考资料

- [Redux 入门教程][20]
- [Redux][21]

[1]: http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091801.png
[2]: https://github.com/rackt/redux
[3]: https://medium.com/@dan_abramov/the-evolution-of-flux-frameworks-6c16ad26bb31
[4]: https://github.com/sebmarkbage/ecmascript-rest-spread
[5]: https://github.com/rackt/react-redux
[6]: https://github.com/rackt/react-redux/blob/master/src/components/Provider.js
[7]: https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html
[8]: http://rackt.github.io/redux/docs/api/bindActionCreators.html
[9]: https://github.com/rackt/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
[10]: ../redux-demo/
[11]: ../redux-demo/Examples.md

[20]: http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
[21]: https://hulufei.gitbooks.io/react-tutorial/content/redux.html