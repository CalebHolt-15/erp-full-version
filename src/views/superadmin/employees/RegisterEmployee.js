import {useContext} from "react"
import {List} from "react-feather"
import {kFormatter} from "@utils"
import Avatar from "@components/avatar"
import Timeline from "@components/timeline"
import AvatarGroup from "@components/avatar-group"
import jsonImg from "@src/assets/images/icons/json.png"
import InvoiceList from "@src/views/apps/invoice/list"
import ceo from "@src/assets/images/portrait/small/avatar-s-9.jpg"
import {ThemeColors} from "@src/utility/context/ThemeColors"
import Sales from "@src/views/ui-elements/cards/analytics/Sales"
import AvgSessions from "@src/views/ui-elements/cards/analytics/AvgSessions"
import CardAppDesign from "@src/views/ui-elements/cards/advance/CardAppDesign"
import SupportTracker from "@src/views/ui-elements/cards/analytics/SupportTracker"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  // Form,
  Button,
  Label
} from "reactstrap"

import OrdersReceived from "@src/views/ui-elements/cards/statistics/OrdersReceived"
import CardCongratulations from "@src/views/ui-elements/cards/advance/CardCongratulations"
import SubscribersGained from "@src/views/ui-elements/cards/statistics/SubscribersGained"

import "@styles/react/libs/charts/apex-charts.scss"
import axios from "axios"
import {Field, Form, Formik} from "formik"
import {TextField} from "formik-material-ui"

const RegisterEmployee = () => {
  const initialValues = {
    name: "",
    email: "",
    password: ""
  }

  const onSubmit = async (values) => {
    console.log("onSubmit")
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { ...values },
      withCredentials: true,
      url: "https://127.0.0.1:8089/api/employee"
    }
    try {
      const { data } = await axios(options)
      console.log("added:", data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <CardBody>
            <Form>
              <Row>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Field
                      component={TextField}
                      name="name"
                      type="text"
                      label="Name"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      rows={4}
                    />
                  </FormGroup>
                </Col>

                <Col md="6" sm="12">
                  <FormGroup>
                    <Field
                      component={TextField}
                      name="email"
                      type="text"
                      label=" Email"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      rows={4}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Field
                      component={TextField}
                      name="password"
                      type="password"
                      label=" Password"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      rows={2}
                    />
                  </FormGroup>
                </Col>

                <Col sm="12">
                  <FormGroup className="d-flex mb-0">
                    <Button.Ripple
                      className="mr-1"
                      color="primary"
                      type="submit"
                      onClick={onSubmit}
                    >
                      Submit
                    </Button.Ripple>
                    <Button.Ripple outline color="secondary" type="reset">
                      Reset
                    </Button.Ripple>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        )
      }}
    </Formik>
  )
}

export default RegisterEmployee

// return (
//   <Card>
//     <CardHeader>
//       <CardTitle tag="h4">Multiple Column</CardTitle>
//     </CardHeader>

//     <CardBody>
//       <Form>
//         <Row>
//           <Col md="6" sm="12">
//             <FormGroup>
//               <Label for="name">Employee Name</Label>
//               <Input type="text" name="name" placeholder="First Name" />
//             </FormGroup>
//           </Col>
//           <Col md="6" sm="12">
//             <FormGroup>
//               <Label for="email">Email</Label>
//               <Input type="text" name="email" placeholder="Last Name" />
//             </FormGroup>
//           </Col>

//           <Col sm="12">
//             <FormGroup className="d-flex mb-0">
//               <Button.Ripple
//                 className="mr-1"
//                 color="primary"
//                 type="submit"
//                 onClick={(e) => onSubmit(e)}
//               >
//                 Submit
//               </Button.Ripple>
//               <Button.Ripple outline color="secondary" type="reset">
//                 Reset
//               </Button.Ripple>
//             </FormGroup>
//           </Col>
//         </Row>
//       </Form>
//     </CardBody>
//   </Card>
// )
