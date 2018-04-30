import React, { Component } from 'react'
import ToolBar from '../components/drawable-components/ui/tool-bar'
import SettingsBar from '../components/drawable-components/ui/settings-bar'
import MenuBar from '../components/drawable-components/ui/menu'
import DrawBoard from '../containers/drawable-graph-containers/draw-board'
export default class DrawableGraph extends Component {
  render() {
    return (
        <div style={{ background: "#e7e7e7" }} className="container-fluid">
        {/* MenuBar */}

        <MenuBar />

        <div className="row  mx-auto " style={{ marginTop: -10 }}>
          {/* Tools Menu */}
          <ToolBar />
          <DrawBoard />
          {/*Settings*/}
          <SettingsBar />
        </div>
      </div>
    )
  }
}
