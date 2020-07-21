import React from 'react';

function List(props){
  const items = props.items.length ? (
  props.items.map((item, index) => 
  {return (<div key={item.id} className="checkbox-container"><label><input className="checkbox" type="checkbox" checked={item.checked} onChange={props.onChange(index)}/>{item.term}</label><span className="close" onClick={() => props.deleteItem(item.id)}>×</span></div>)}
    )) : (<p>Brak rzeczy do spakowania</p>)

  return (
    <ul>
    {items}
  </ul>
    )}
  

export default List;