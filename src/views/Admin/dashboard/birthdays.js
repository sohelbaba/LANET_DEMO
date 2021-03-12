import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import moment from "moment";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
const data = [
  {
    id: uuid(),
    name: "Divyesh Patel",
    imageUrl: "/static/images/avatars/avatar_1.png",
    date: "26 March",
  },
  {
    id: uuid(),
    name: "Niresh Sharma",
    imageUrl: "/static/images/avatars/avatar_5.png",
    date: "28 March",
  },
];

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  image: {
    height: 48,
    width: 48,
  },
});

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [products] = useState(data);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Upcoming Birthdays" />
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem divider={i < products.length - 1} key={product.id}>
            <div style={{ marginRight: "8px" }}>
              <Avatar src={product.imageUrl} />
            </div>
            <ListItemText
              primary={product.name}
              secondary={`${product.date}`}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          endIcon={<KeyboardArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string,
};

export default LatestProducts;
