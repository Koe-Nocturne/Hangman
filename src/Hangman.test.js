import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Hangman from "./Hangman";

it("renders without crashing", function () {
  shallow(<Hangman />);
});

it("matches snapshot after click", function () {
  let wrapper = shallow(<Hangman />);

  wrapper
    .find("button[value='z']")
    .simulate("click", { target: { value: "z" } });

  let img_elem = wrapper.find("img").first().html();
  let serialized = toJson(wrapper);
  
  expect(img_elem).toContain('src="1.jpg"');
  expect(serialized).toMatchSnapshot();

});

it("image doesn't disapears after 6 wrong guesses", function(){
  let wrapper = mount(<Hangman />);

  wrapper.setState({
    nWrong: wrapper.props().maxWrong + 1
  });
  let img_elem = wrapper.find("img").first().html();
  expect(img_elem).toContain('src="6.jpg"');
});