import './Header.scss';
import { h, FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';
import { NavLink, useParams } from 'react-router-dom';
import { Flex } from 'boarder-components';

const b = block('Header');

const Header: FunctionalComponent = () => {
  const { login } = useParams<{ login: string }>();

  return (
    <Flex className={b()}>
      <NavLink
        to={`/${login}`}
        activeClassName={b('link', { active: true }).toString()}
      >
        Карточки
      </NavLink>
    </Flex>
  );
};

export default memo(Header);
