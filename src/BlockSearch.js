import React, { useEffect, useState } from 'react';
import { Form, Grid, Table, Icon, Message } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

function Main(props) {
  const { api } = useSubstrate();
  const [blockInfo, setBlockInfo] = useState();
  const [blockhash, setBlockhash] = useState();

  const getBlockInfo = async (blockhash) => {
    try {
      const blockInfo = await api.rpc.chain.getHeader(blockhash);

      setBlockInfo(blockInfo);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid.Column>
      <h1>Search for a Block</h1>

      <Form
        onSubmit={async (e, { value }) => await getBlockInfo(blockhash)}
        size='small'
      >
        <Form.Group widths={12}>
          <Form.Input
            size='large'
            width={10}
            placeholder={'Insert hash here'}
            onChange={(e, { value }) => setBlockhash(value)}
          />
          <Form.Button content={<Icon name='search'/>} />
        </Form.Group>
      </Form>

      {blockInfo && blockInfo.number && (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>Data</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Block</Table.Cell>
              <Table.Cell>{blockInfo.number.toNumber()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Parent Hash</Table.Cell>
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

export default function BlockInfoBySeach(props) {
  const { api } = useSubstrate();
  return api.rpc && api.rpc.chain.getHeader ? <Main {...props} /> : null;
}