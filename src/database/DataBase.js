import React from 'react'
import lastMod from './lastMod'
import listWorkshopsByOwner from './listWorkshopsByOwner'
import getWorkshopByPin from './getWorkshopByPin'
import listBricks from './listBricks'
//import debug from '../debug'

class DataBase extends React.Component {
  lastMod=0

  checkLastMod = () => {
    clearInterval(this.checkLastModTimer);

      if(this.props.query==='loadWorkshops')
        lastMod('',
        (lastMod) => {
          if(this.lastMod!==lastMod){
              this.loadWorkshops()
              this.lastMod=lastMod
        }})

      if(this.props.query==='loadBricks')
        lastMod(this.props.owner,
        (lastMod) => {
          if(this.lastMod!==lastMod){
              this.loadBricks()
              this.lastMod=lastMod
        }})

    this.checkLastModTimer = setInterval(this.checkLastMod, 2000);
  }

  loadWorkshops = () => {
    getWorkshopByPin(this.props.pin,
      (pinWorkshop) => this.props.onDataLoaded({ pinWorkshop }))

    if(this.props.mg)
    listWorkshopsByOwner(this.props.mg,
      (mgWorkshops) => this.props.onDataLoaded({ mgWorkshops }))
  }

  loadBricks = () => {
    listBricks(this.props.owner, this.props.workshopId,
      ({bricks, workshop}) => {
        if(!workshop) window.history.back()
        this.props.onDataLoaded({ bricks, workshop })})
  }

  componentWillMount(){
    this.checkLastMod()
  }

  componentWillUnmount() {
    clearInterval(this.checkLastModTimer)
  }

  componentDidUpdate(prevProps) {
    if( this.props.pin!==prevProps.pin || this.props.mg!==prevProps.mg )
      this.lastMod=0
  }

  render() { return null }
}

export default DataBase
