import React, {Component} from "react";
import {getOpenScrap} from './Functions';
import ScrapItem from "./ScrapItem";
import { Link} from "react-router-dom";

class OpenScrapList extends Component {
    constructor(props) {
        super(props);
       
        

        const query = new URLSearchParams(window.location.search);
        const page = parseInt(query.get('page'))

        this.getOpenScrap = this.getOpenScrap.bind(this)
        

        

        this.state = {
            hasNext:false,
            hasPrev:false,
            page: page,
            numItem: 0,
            prodID: [],
            units: [],
            user: [],
            lotID: [],
            failure: [],
            index: [],
            loaded: false,



        }

        const runScrap  = async () => {
            await this.getOpenScrap(this.state.page);
        }

        runScrap();

        this.nextPage =this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);

        console.log(`our current page is ${this.state.page}`)




    }

    
    async getOpenScrap(){



        const ensurePageCorrect  = async () => {
            const query = new URLSearchParams(window.location.search);
            const p1 = Number(query.get('page'))
            return p1
    
        }
        const p1 = await ensurePageCorrect();

        console.log(`our current page is ${p1}`)


        
        let {page, hasNext, hasPrev, numItem, prodID, desc, failure, isOpen, lotID, user, cost, time, units, index} = await getOpenScrap(p1)
        const nextPage = p1+1;
        const prevPage = p1-1;

        this.setState( {
            page: p1,
            nextPage: nextPage,
            prevPage: prevPage,
            hasNext: hasNext,
            hasPrev: hasPrev,
            numItems: numItem ,
            index: index,
            prodID: prodID,
            desc: desc,
            failure: failure,
            isOpen: isOpen,
            lotID: lotID,
            user:user,
            time:time,
            units: units,
            cost: cost,

        })

        this.setState({
            loaded: true,
        })
        console.log(`our cur page is ${p1}`)
        console.log(`next page is ${nextPage}`)
        console.log(`prev page is ${prevPage}`)
        console.log(`our user1 is: ${this.state.user[1]}`)







    }

    async nextPage(){

        const ensureStateChange  = async () => {
            const query = new URLSearchParams(window.location.search);
            const p1 = Number(query.get('page'))
            console.log(`in nextPage, the url page is: ${p1}`)
            const nextPage = p1 + 1;
            const prevPage = p1 - 1;
    
            this.setState(
                {
                    page: p1,
                    nextPage: nextPage,
                    prevPage: prevPage,
        
                }
            )

    
        }

        await ensureStateChange();


        try{
            await this.getOpenScrap()
        }catch(e){
            this.props.pushLogin();
        }


        
    }


    async prevPage(){


        const ensureStateChange  = async () => {
            const query = new URLSearchParams(window.location.search);
            const p1 = Number(query.get('page'))
            console.log(`in prevPage, the url page is: ${p1}`)
            const nextPage = p1 + 1;
            const prevPage = p1 - 1;
    
            this.setState(
                {
                    page: p1,
                    nextPage: nextPage,
                    prevPage: prevPage,
        
                }
            )

    
        }

        await ensureStateChange();

        
        try{
            await this.getOpenScrap()
        }catch(e){
            this.props.pushLogin();
        }

    }




    render(){
        return (
            <div className="scrap">

                <h1> Open Scrap List</h1>
        { this.state.loaded == true ? this.state.index.map((i) => <ScrapItem index={i} user={this.state.user[i]} prodID={this.state.prodID[i]} desc={this.state.desc[i]} failure={this.state.failure[i]} isOpen={this.state.isOpen[i]} lotID={this.state.lotID[i]} time={this.state.time[i]} units={this.state.units[i]} cost={this.state.cost[i]} ></ScrapItem>) : <h1>Loading</h1>}


                <div className="row" >
                    {this.state.hasNext == true ? <Link to={`/openScrap?page=${this.state.nextPage}`} className="nav_item"  onClick={this.nextPage} value="Next page"> Next Page</Link> : ""}
                    {this.state.hasPrev == true ?  <Link to={`/openScrap?page=${this.state.prevPage}`} className="nav_item" onClick={this.prevPage} value="Prev page"> Previous Page</Link> : ""}
                </div>
            </div>
        );
    }
}

export default OpenScrapList;
