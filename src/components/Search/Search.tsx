import { forwardRef } from 'react';
import styles from './Search.module.css';
import cn from 'classnames';
import { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
  { className, isValid = true, ...props },
  ref,
) {
  return (
    <div className={styles['input-wrapper']}>
      <input
        {...props}
        ref={ref}
        className={cn(styles['input'], className, styles['input'], {
          [styles['invalid']]: !isValid,
        })}
        {...props}
      />
      <img className={styles['serach-icon']} src="./search.svg" alt="Search" />
    </div>
  );
});

export default Search;
