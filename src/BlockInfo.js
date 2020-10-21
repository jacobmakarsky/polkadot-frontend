import React, { useEffect, useState } from 'react';
import { Form, Grid, Label, Table, Icon, Message } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

function Main(props) {
  const { api } = useSubstrate();
  const [blockInfo, setBlockInfo] = useState();

  useEffect(() => {
    const unsubscribeAll = null;
    const getInfo = async () => {
      try {
        api.rpc.chain.subscribeNewHeads((header) => {
          setBlockInfo(header);
        });
      } catch (e) {
        console.error(e);
      }
    };
    getInfo();
    return () => unsubscribeAll && unsubscribeAll();
  }, [api.derive.chain, api.rpc.chain, blockInfo]);

  return (
    <Grid.Column style={{ margin: '1rem 0s' }}>
    <h1>Latest Block Information</h1>
      {blockInfo && (
        <Table celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Block</Table.Cell>
              <Table.Cell>{blockInfo.number.toNumber()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Hash</Table.Cell>
              <Table.Cell>{blockInfo.hash.toHuman()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ParentHash</Table.Cell>
              <Table.Cell>{blockInfo.parentHash.toHuman()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>State Root</Table.Cell>
              <Table.Cell>{blockInfo.stateRoot.toHuman()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Extrinsics Root</Table.Cell>
              <Table.Cell>{blockInfo.extrinsicsRoot.toHuman()}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </Grid.Column>
  );
}

export default function BlockInfo(props) {
  const { api } = useSubstrate();
  return api.rpc &&
    api.rpc.system &&
    api.rpc.chain &&
    api.derive.chain &&
    api.derive.chain.bestNumber &&
    api.rpc.chain.getBlock &&
    api.rpc.chain.subscribeNewHeads ? (
    <Main {...props} />
  ) : null;
}