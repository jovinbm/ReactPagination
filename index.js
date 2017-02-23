require('./index.scss');
import React from 'react';

const First = React.createClass({
  
  propTypes: {
    page      : React.PropTypes.number.isRequired,
    onNavigate: React.PropTypes.func.isRequired
  },
  
  shouldComponentUpdate(next_props){
    
    return this.props.page !== next_props.page;
    
  },
  
  navigate(e){
    e.preventDefault();
    
    const {
            onNavigate
          } = this.props;
    
    return onNavigate(1);
    
  },
  
  render(){
    
    const {
            page
          } = this.props;
    
    if (page === 1) {
      return false;
    }
    
    return (
      
      <div className="First"
           onClick={this.navigate}>
        
        <span>First</span>
      
      </div>
    
    );
  }
  
});

const Next = React.createClass({
  
  propTypes: {
    page             : React.PropTypes.number.isRequired,
    total_results    : React.PropTypes.number.isRequired,
    quantity_per_page: React.PropTypes.number.isRequired,
    onNavigate       : React.PropTypes.func.isRequired
  },
  
  navigate(e){
    e.preventDefault();
    
    const {
            page,
            onNavigate
          } = this.props;
    
    return onNavigate(page + 1);
  },
  
  shouldComponentUpdate(next_props){
    
    return this.props.page !== next_props.page;
    
  },
  
  render(){
    
    const {
            page,
            total_results,
            quantity_per_page
          } = this.props;
    
    const total_pages = Math.ceil(total_results / quantity_per_page);
    
    if (page >= total_pages) {
      
      return false;
      
    }
    
    return (
      
      <div className="Next"
           onClick={this.navigate}>
        
        <span>Next</span>
      
      </div>
    
    );
  }
  
});

const Prev = React.createClass({
  
  propTypes: {
    page      : React.PropTypes.number.isRequired,
    onNavigate: React.PropTypes.func.isRequired
  },
  
  navigate(e){
    e.preventDefault();
    
    const {
            page,
            onNavigate
          } = this.props;
    
    return onNavigate(page - 1);
    
  },
  
  shouldComponentUpdate(next_props){
    
    return this.props.page !== next_props.page;
    
  },
  
  render(){
    
    const {
            page
          } = this.props;
    
    if (page === 1) {
      return false;
    }
    
    return (
      
      <div className="Prev"
           onClick={this.navigate}>
        
        <span>Prev</span>
      
      </div>
    
    );
  }
  
});

const Last = React.createClass({
  
  propTypes: {
    page             : React.PropTypes.number.isRequired,
    total_results    : React.PropTypes.number.isRequired,
    quantity_per_page: React.PropTypes.number.isRequired,
    onNavigate       : React.PropTypes.func.isRequired
  },
  
  navigate(e){
    e.preventDefault();
    
    const {
            total_results,
            quantity_per_page,
            onNavigate
          } = this.props;
    
    return onNavigate(Math.ceil(total_results / quantity_per_page));
  },
  
  shouldComponentUpdate(next_props){
    
    return this.props.total_results !== next_props.total_results ||
      this.props.quantity_per_page !== next_props.quantity_per_page ||
      this.props.page !== next_props.page;
    
  },
  
  render(){
    
    const {
            page,
            total_results,
            quantity_per_page
          } = this.props;
    
    const total_pages = Math.ceil(total_results / quantity_per_page);
    
    if (page >= total_pages) {
      
      return false;
      
    }
    
    return (
      
      <div className="Last"
           onClick={this.navigate}>
        
        <span>Last</span>
      
      </div>
    
    );
  }
  
});

const PageNumber = React.createClass({
  
  propTypes: {
    page_number: React.PropTypes.number.isRequired,
    onNavigate : React.PropTypes.func.isRequired
  },
  
  navigate(e){
    e.preventDefault();
    
    const {
            page_number,
            onNavigate
          } = this.props;
    
    return onNavigate(page_number);
    
  },
  
  shouldComponentUpdate(next_props){
    
    return this.props.page !== next_props.page || this.props.page_number !== next_props.page_number;
    
  },
  
  render(){
    
    const {
            page,
            page_number
          } = this.props;
    
    const classes = ['PageNumber'];
    
    if (page_number === page) {
      classes.push('active');
    }
    
    return (
      
      <div className={classes.join(' ')}
           onClick={this.navigate}>
        
        <span>{page_number}</span>
      
      </div>
    
    );
  }
  
});

const Pagination = React.createClass({
  
  getDefaultProps(){
    return {
      visible_pages: 10
    };
  },
  
  propTypes: {
    page             : React.PropTypes.number.isRequired,
    total_results    : React.PropTypes.number.isRequired,
    quantity_per_page: React.PropTypes.number.isRequired,
    visible_pages    : React.PropTypes.number,
    onNavigate       : React.PropTypes.func.isRequired
  },
  
  render(){
    
    const {
            page,
            total_results,
            quantity_per_page,
            visible_pages,
            onNavigate
          }               = this.props;
    
    if (total_results <= quantity_per_page) {
      return false;
    }
    
    const total_pages  = Math.ceil(total_results / quantity_per_page);
    const page_numbers = [];
    
    const min_page_number = Math.max(1, page - (Math.ceil(visible_pages / 2)));
    const max_page_number = Math.min(min_page_number + visible_pages - 1, total_pages);
    
    for (let i = min_page_number; i <= max_page_number; i++) {
      
      page_numbers.push(
        <PageNumber key={i}
                    page={page}
                    page_number={i}
                    onNavigate={onNavigate}/>
      );
      
    }
    
    return (
      
      <div className="Pagination">
        
        <First page={page}
               total_results={total_results}
               quantity_per_page={quantity_per_page}
               onNavigate={onNavigate}/>
        
        <Prev page={page}
              total_results={total_results}
              quantity_per_page={quantity_per_page}
              onNavigate={onNavigate}/>
        
        <Next page={page}
              total_results={total_results}
              quantity_per_page={quantity_per_page}
              onNavigate={onNavigate}/>
        
        {page_numbers}
        
        <Last page={page}
              total_results={total_results}
              quantity_per_page={quantity_per_page}
              onNavigate={onNavigate}/>
      
      </div>
    
    );
    
  }
  
});

export {Pagination};