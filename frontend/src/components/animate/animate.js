import { CSSTransition } from 'react-transition-group';
import "animate.css";

export function Animate(props){

  const type = props.type || 'slideup';

  return (
    <CSSTransition
      in appear
      timeout={ props.timeout || 300 }
      classNames={ `animate__animated animate__${type}` }>

        <div className={ `animate__animated animate__${type}` }>
          { props.children }
        </div>

    </CSSTransition>
  )
}