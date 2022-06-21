## 命令

**npm init**

初始化项目

**npm start**

在开发模式下运行应用程序。 打开 http://localhost:3000 在浏览器中查看, 如果您进行编辑，该页面将重新加载, 您还将在控制台中看到任何 lint 错误。

**npm run build**

将用于生产的应用生成到`build`文件夹。它在生产模式下正确地捆绑了 React，并优化了构建以获得最佳性能。 构建被缩小，文件名包含哈希。 你的应用已准备好部署，有关详细信息，请参阅有关部署的部分。

## 项目说明

### 开发框架以及语言

框架：React 17.9 

语言：Typescript

状态管理：Recoil

### 文件夹结构以及说明

**./public** 

公用文件夹，静态资源置于该文件夹下

​	**./img**

​	图片资源

​	**./models**

​	模型相关数据，主要为无人机三维模型

​	**注意**

​	由于react文件路径的限制，静态文件的引入方法如下

​	1.将静态文件置于该文件夹下

​	2.路径设置为`./static/static.png`

**./src**

​	源代码文件，所有开发代码置于下列

​	**./api**

​    接口文件夹，所有向服务器请求的api放于该文件夹下

​		**taskAPI.tsx**

​		任务相关的请求api，其中post/get作为区分请求的类型

​		**uavListAPI.tsx**

​		无人机请求相关的api

​	**./componnents**

​	组件文件夹，开发的所有react的组件组织在该文件夹下

​		**./common**

​		通用组件

​		-commonEntity.tsx 通用地图实体组件，通过传入的属性，控制返回的地图实体组件

​		-mapVisualControl.tsx 通过visual的设置，控制地图实体组件是否可视化

​		-websocktInfo 通过该组件接收websocket信息

​		**./map**

​		同map相关的所有组件

​		-mapConfig.tsx 地图的通用配置，osm，osmstyle等

​		-newMapViewer.tsx 主地图组件

​		-platformPoint.tsx 平台位置在地图显示组件

​		-selectPlanArea.tsx 路径规划中，通过可视化图选择的区域范围

​		-targetPoint.tsx 目标点在地图显示组件

​		-taskBoundary.tsx 任务区域范围地图可视化组件

​		-uavInTimePath.tsx 实时无人机飞行组件

​		-viewUavVisual.tsx 路径规划后，每个无人机的路径可视化

​		**./plugins**

​		插件部分，是指在基本地图框架上，可实时增加的其它功能

​			**./fire**

​			同火灾相关的组件

​			**pluginsSider.tsx**

​			控制侧边栏展示那些插件的控件

​		**./pureContorl**

​		插件控制面板的组件，主要控制是否添加额外功能

​		-controlSider.tsx 控制面板部分的侧边栏内容

​		-fireControl.tsx 火灾功能插件控制面板部分

​		**./pureModal**

​		对话框相关组件

​		-createTaskModal.tsx 动态任务中弹出的创建任务

​		-dynamicTaskModal.tsx 动态任务中弹出的对话框 -选择创建任务或者关联任务

​		-relateTaskModal.tsx 关联任务对话框

​		-taskModal.tsx 静态任务创建对话框

​		-methodModal.tsx 静态任务部分的方案选择，分为四类，无无人机规划、单无人机平扫、多无人机平扫、多无人机		多目标

​			-target.tsx 选择目标点的对话框部分

​			-platform.tsx 选择无人机起飞对话框部分

​		**./pureTask**

​		-pureTask.tsx 任务面板总组件

​			-pureTaskControl.tsk 控制任务类型的，静态或者动态任务，以及创建任务、结束任务部分

​			-pureTaskInfo.tsx 任务信息组件，展示某一任务的具体信息

​				-TaskInfo.tsx 任务信息

​				-UavInfo.tsx 任务中的无人机信息

​			-pureTaskList.tsx 任务列表信息，展示静态或者动态的历史任务列

​		**./UavManagement**

​		无人机信息面板

​		**visual**

​		可视化面板，管理无人机路径规划后的可视化信息

​		-visualSider 可视化侧边栏组件

​		-pieChartVisual 饼图组件，通过d3实现，添加了点击交互时间

​		-uavAreaText 路径规划详细信息，通过点击饼图进行切换具体信息

​		**newMainView.tsx** 主界面组件

​		**siderContext.tsx**侧边栏组件

**./context**

存储上下文文件夹，暂时废弃

**./hook**

自定义hook文件夹，主要是提取相关的逻辑，减少代码冗余

-useMousePolygon.ts 该钩子是提供给鼠标绘制地图多边形功能

-useUpdatePointCol.ts 该判断点是否位于多边形内，如果位于则添加

**./interface **  **./types**

存储自定义type的文件

-plugins.tsx 同插件相关的类型定义

-taskType.tsx 同任务相关的类型定义

-uavManaType.tsx 同无人机关系相关的类型定义

**./mock**

构造mock数据文件夹，利用该数据进行初步的组件测试

**./utils**

通用函数文件夹，包括了一些通用处理函数

**./store**

存储所有全局状态的文件夹

## 开发说明

###　插件开发

插件开发应尽量遵循解耦的思路，即不妨碍基础功能的运行，其主要需根据下列开发

1. 插件的注册在control面板中进行注册，根据插件的类型具体至大类中进行注册，如火灾信息插件是位于火灾功能插件中。
2. 添加该组件后，对应至侧边栏中，即侧边栏对应的是该组件的功能内容
3. 设计该组件的功能，主要分为两部分，一部分为主题功能，所有接口请求写于组件单独文件中，一部分为同地图相关的实体功能，同样自定义组件，然后将组件注册于地图实体控制模块中

### 地图实体可视化控制

地图实体可视化控制，主要涉及两部分内容

1. 全局状态`entitiesPropertiesAtom`

   `clockIsCurrent` 控制时钟是否实时

   `cameraIsFlyTo` 控制是否进行camerafly

   `cameraFlyToPosition` camerafly的具体位置

   `entitiesProperties` 

   `-key`组件名字

   `-visual` 是否显示组件

   `-track`是否追踪组件

2. `commonEntity` 通用组件，根据key以及visual返回对象

3. 通过全局状态内属性将实体动态添加至地图，通过修改`entitiesPropetiesAtom`实现对于可视化

### 状态管理

对于状态的全局管理部分，需要遵循下列思路

1. 在store中，指定文件夹下添加文件，如火灾相关的全局状态，添加至`fire`文件中
2. store分为两类，atom以及selector，其中原则是atom是单独的全局状态，不受其它状态的影响，而selector则是与atom相关的派生状态，atom发生改变则selector发生改变，以下有两个原则
   - 使用selector的原则是，当与其相关的atom发生改变时候，selector一定发生改变，否则不采用selector
   - 防止循环引用产生的嵌套更新的问题，同时需要考虑防止过高频率的更新，在需要更新的时候再进行更新。

