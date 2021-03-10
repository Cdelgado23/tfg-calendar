import React from 'react';
import { LateralMenu, Timetable, MenuHeader, MenuBody, FullWidthMenu, SpaceBetweenMenu, Button} from './PagesElements';

const Horario = () => {
  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }}
  >
    <FullWidthMenu>
      ASdasdasd
    </FullWidthMenu>
      <SpaceBetweenMenu>
        <LateralMenu>
          <MenuHeader>
            <h2>Asignaturas</h2>
          </MenuHeader>
          <MenuBody>
          </MenuBody>

        </LateralMenu>
        <Timetable>
        <h1>Horario</h1>
        </Timetable>
        <LateralMenu>
          <MenuHeader>
            <h2>Asignaturas</h2>
          </MenuHeader>
          <MenuBody>
          <Button>
            Hola
          </Button>
          </MenuBody>

        </LateralMenu>     
      </SpaceBetweenMenu>
    </div>
  );
};

export default Horario;