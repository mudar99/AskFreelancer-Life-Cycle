import { Component } from "react";


class AccountType extends Component {
    state = {
        Freelancer: true,
        Client: true,
    }
    FreelancerHandler = () => {
        this.setState(prevState => ({
            Freelancer: !prevState.Freelancer
        }));
        this.props.Freelancer(this.state.Freelancer);
    }
    ClientHandler = () => {
        this.setState(prevState => ({
            Client: !prevState.Client
        }));
        this.props.Client(this.state.Client);
    }
    render() {
        return (
            <div className="m-5">
                <h3 className="mb-5  ">: نوع الحساب</h3>
                <div>
                    <label className="mr-4">
                        <small >(أبحث عن مشاريع لتنفيذها) </small>فريلانسر
                    </label>
                    <input type="checkbox" onClick={this.FreelancerHandler} />
                </div>
                <div>
                    <label className="mr-4"> <small >(أبحث عن فريلانسرز لتنفيذ المشاريع) </small>صاحب مشاريع  </label>
                    <input type="checkbox" onClick={this.ClientHandler} />
                </div>
            </div>

        );
    }


}
export default AccountType
