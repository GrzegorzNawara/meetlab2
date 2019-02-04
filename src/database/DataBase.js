import React from 'react'
import lastMod from './lastMod'
import listWorkshopsByOwner from './listWorkshopsByOwner'
import getWorkshopByPin from './getWorkshopByPin'
import saveBrick from './saveBrick'
import listBricks from './listBricks'
import deleteBrick from './deleteBrick'
import saveWorkshop from './saveWorkshop'
import deleteWorkshop from './deleteWorkshop'
import debug from '../debug'

class DataBase extends React.Component {
  lastMod=0;

  checkLastMod = () => {
    clearInterval(this.checkLastModTimer);
      debug(this.props.owner)

      lastMod('workshopsByPin.txt',
      (lastMod) => {
        if(this.lastMod<lastMod){
            this.loadWorkshops()
            this.lastMod=debug(lastMod,'LASTMOD-1')
      }})

      lastMod(this.props.owner,
      (lastMod) => {
        if(this.lastMod<lastMod){
            this.loadBricks()
            this.lastMod=debug(lastMod,'LASTMOD-2')
      }})
    this.checkLastModTimer = setInterval(this.checkLastMod, 2000);
  }

  loadWorkshops = () => {
    //clearInterval(this.loadWorkshopsTimer);

    getWorkshopByPin(this.props.pin,
      (pinWorkshop) => this.props.onDataLoaded({ pinWorkshop }))

    if(this.props.mg)
    listWorkshopsByOwner(this.props.mg,
      (mgWorkshops) => this.props.onDataLoaded({ mgWorkshops }))

    //this.loadWorkshopsTimer = setInterval(this.loadWorkshops, 5000);
  }

  loadBricks = () => {
    //clearInterval(this.loadBricksTimer);
    listBricks(this.props.owner, this.props.workshopId,
      ({bricks, workshop}) => this.props.onDataLoaded({ bricks, workshop }))
    //this.loadBricksTimer = setInterval(this.loadBricks, 5000);
  }

  componentWillMount(){
    debug(1,'MOUNT')
    this.checkLastMod()
    //if(this.props.query==='loadWorkshops')
    //  this.loadWorkshops()
    //if(this.props.query==='loadBricks')
    //  this.loadBricks()
  }

  componentWillUnmount() {
    debug(1,'UN-MOUNT')
    clearInterval(this.checkLastModTimer);
    //if(this.props.query==='loadWorkshops')
    //  clearInterval(this.loadWorkshopsTimer);
    //if(this.props.query==='loadBricks')
    //  clearInterval(this.loadBricksTimer);
  }

  componentDidUpdate(prevProps) {
  }

  render() { return null }
}

export default DataBase
