import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
const data = [
  {
    id: uuid(),
    name: 'Dropbox',
    imageUrl: '/static/images/products/product_1.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Medium Corporation',
    imageUrl: '/static/images/products/product_2.png',
    updatedAt: moment().subtract(2, 'hours')
  }
];

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [products] = useState(data);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader  title="New Requests"/>
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem divider={i < products.length - 1} key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`${product.updatedAt.fromNow()}`}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
          <CardActions>
                <Button color="primary" endIcon={<KeyboardArrowRightIcon />} size="small" variant="text">
                     View all
                </Button>   
          </CardActions>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
