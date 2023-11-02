import css from './Section.module.css';

const Section = ({ children, title }) => {
  return (
    <section className={css.section}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
};

export default Section;
