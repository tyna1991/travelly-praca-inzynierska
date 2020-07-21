import React from 'react';
import '../../../App.css';
import List from './List'
import Term from './Term';
import { connect } from 'react-redux';
import {tripActions} from './../../../_actions/trip.actions'
import Preloader from '../../Preloader';



class Checklist extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            term:[{name:'', disabled:false}],
            items:this.props.data.list
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addTerm = this.addTerm.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.onClickHandler=this.onClickHandler.bind(this);
        this.deleteTerm=this.deleteTerm.bind(this)
      }
      onChange(index, e){
        return e=>{
          if(e.target.type === "checkbox"){
            const value = e.target.type === "checkbox" && e.target.checked;
            let items= this.state.items;
            items[index].checked=value;
            this.props.updateList(this.props.data.trip.id, items)
            }
            else{
              const terms = this.state.term; 
              const value = e.target.value;
              terms[index].name=value;
                if(value){
                  terms[index+1]={...terms[index+1], disabled:false};
                }
                else{
                  if(index===terms.length-2){
                    terms[index+1]={...terms[index+1], disabled:true};
                  }else{
                    terms[index+1]={...terms[index+1], disabled:false};
                  }
                 }

                if(terms[terms.length-1].disabled && terms[terms.length-2].disabled){
                    terms.pop()
                }
              this.setState({
               term: terms
            });
            }
        }
    }
    componentDidMount(){
        if(this.props.id){
            this.props.getList(this.props.id);
          }
          else{
            this.props.getList(this.props.param);
          }
    }
      onSubmit(e){
        e.preventDefault();
        let newItems=[];
        this.state.term.map((element)=>{
          if(element.name){
            newItems.push({term: element.name, checked:false})
          }
          return 0;
        });
        this.setState({
            term:[{name:'', disabled:false}],
            //items: items
        })
        this.props.addToList(this.props.data.trip.id, newItems)
      }
      componentDidUpdate(prevProps){
        if(prevProps.data !== this.props.data){
            this.setState({
                ...this.state,
                items:this.props.data.list
            })
        }
        if(prevProps.data.trip.id !== this.props.data.trip.id){
          this.props.getList(this.props.data.trip.id);
      }
    }
      onClickHandler(index){
        const term = this.state.term;
        if(index===term.length-1){
            this.addTerm()
          } 
        } 

      addTerm(){
          let newTerms = [...this.state.term, {name: '', disabled:true}];
          this.setState({
              term:newTerms
          })
      }
      deleteTerm(indexOfTerm){
                const term=this.state.term.filter((term, index)=>{
                    return index!==indexOfTerm
                })
                term[term.length-1]={...term[term.length-1], disabled:false}
                this.setState({
                    ...this.state,
                  term
                })
        }  
      
      deleteItem(id){
        // const items = this.state.items.filter(item=>{
        //     return item.id !== id
        // })
        // this.setState({
        //     ...this.state,
        //     items
        // })
        this.props.deleteList(this.props.data.trip.id, id)
      }
    render(){
        return(
            <div className="main-1-dashboard checklist">
              {this.props.loading && <Preloader/>}
              <div className="dashboard-container">
              <h2>Lista rzeczy</h2>
              <p>Przed wyjazdem przygotuj listę rzeczy o których warto pamiętać. Zaznaczaj elementy listy, które są już przygotowane.
              </p>
               <form className="checklist">
                {this.state.term.map((element, index)=>{
                     return <Term deleteTerm={this.deleteTerm} termsLength={this.state.term.length} term={element.name} key={index} index={index} onChange={this.onChange} disabled={element.disabled} onClick={this.onClickHandler}/>
                })}
                <button onClick={this.onSubmit} className="action-button light">Dodaj do listy</button>
                </form>
                <List items={this.state.items} deleteItem={this.deleteItem} onChange={this.onChange}/>
                </div>
                </div>
                
        )
    }
}
function mapState(state) {
    const { data, loading } = state.getTrip;
    return { loading, data };
  }
  
  const actionCreators = {
    addToList:tripActions.addToList,
    deleteList:tripActions.deleteList,
    getList: tripActions.getList,
    updateList: tripActions.updateList,
  }
  
  export default connect(mapState, actionCreators)(Checklist);

