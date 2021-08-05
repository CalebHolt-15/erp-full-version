import { useContext } from 'react'
import { List } from 'react-feather'
import { kFormatter } from '@utils'
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'
import jsonImg from '@src/assets/images/icons/json.png'
import InvoiceList from '@src/views/apps/invoice/list'
import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import Sales from '@src/views/ui-elements/cards/analytics/Sales'
import AvgSessions from '@src/views/ui-elements/cards/analytics/AvgSessions'
import CardAppDesign from '@src/views/ui-elements/cards/advance/CardAppDesign'
import SupportTracker from '@src/views/ui-elements/cards/analytics/SupportTracker'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import OrdersReceived from '@src/views/ui-elements/cards/statistics/OrdersReceived'
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'
import SubscribersGained from '@src/views/ui-elements/cards/statistics/SubscribersGained'

import '@styles/react/libs/charts/apex-charts.scss'

const AddSchool = () => {

  
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Async Submit</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for='firstNameAsync'>First Name</Label>
            <Input
              id='firstNameAsync'
              name='firstNameAsync'
              innerRef={register({ required: true })}
              invalid={errors.firstNameAsync && true}
              placeholder='Bruce'
            />
          </FormGroup>
          <FormGroup>
            <Label for='lastNameAsync'>Last Name</Label>
            <Input
              id='lastNameAsync'
              name='lastNameAsync'
              innerRef={register({ required: true })}
              invalid={errors.lastNameAsync && true}
              placeholder='Wayne'
            />
          </FormGroup>
          <FormGroup>
            <Label for='emailAsync'>Email</Label>
            <Input
              type='email'
              name='emailAsync'
              id='emailAsync'
              innerRef={register({ required: true })}
              invalid={errors.emailAsync && true}
              placeholder='bruce.wayne@email.com'
            />
          </FormGroup>
          <FormGroup>
            <Label for='passwordAsync'>Password</Label>
            <Input
              type='password'
              id='passwordAsync'
              name='passwordAsync'
              innerRef={register({ required: true })}
              invalid={errors.passwordAsync && true}
              placeholder='passwordAsync'
            />
          </FormGroup>
          <FormGroup className='d-flex mb-0'>
            <Button.Ripple className='mr-1' color='primary' type='submit'>
              Submit
            </Button.Ripple>
            <Button.Ripple outline color='secondary' type='reset'>
              Reset
            </Button.Ripple>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  )
}
   
export default AddSchool
