import React, { useState } from "react";
// eslint-disable-next-line
import styles from "./styles.css";
import api from "../../services/api";
import UseLoader from "../../hooks/Loader";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ConferenteCreate() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [edicao, setEdicao] = useState("");
  const [isbn, setIsbn] = useState("");
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState("");
  const { register, handleSubmit, errors } = useForm();

  function clearMessages() {
    setSubmitSuccessMessage("");
    setSubmitErrorMessage("");
  }

  async function onSubmit() {
    const data = {
      titulo,
      autor,
      editora,
      edicao,
      isbn,
    };

    try {
      showLoader();
      await api.post("/livro", data).then(() => {
        setSubmitSuccessMessage("Livro cadastrado com sucesso");
        hideLoader();
      });
      document.querySelector("form").reset();
    } catch (err) {
      const { data } = err.response;
      setSubmitErrorMessage(data.message);
      hideLoader();
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-lg-6">
          <h2 className="text-center mb-3 mt-3 titulo-1">Cadastro de livros</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              name="titulo"
              className="form-control"
              placeholder="Título"
              onChange={(e) => setTitulo(e.target.value)}
              ref={register({ required: true, minLength: 3, maxLength: 200 })}
            />
            {errors.titulo && errors.titulo.type === "required" && (
              <small className="erro-validacao">
                Esse campo deve ser preenchido
              </small>
            )}
            {errors.titulo && errors.titulo.type === "minLength" && (
              <small className="erro-validacao">
                Esse campo deve conter entre 3 e 200 caracteres
              </small>
            )}
            {errors.titulo && errors.titulo.type === "maxLength" && (
              <small className="erro-validacao">
                Esse campo deve conter entre 3 e 200 caracteres
              </small>
            )}

            <input
              type="text"
              name="autor"
              className="form-control"
              placeholder="Autor"
              onChange={(e) => setAutor(e.target.value)}
              ref={register({ required: true, minLength: 3, maxLength: 100 })}
            />
            {errors.autor && errors.autor.type === "required" && (
              <small className="erro-validacao">
                Esse campo deve ser preenchido
              </small>
            )}
            {errors.autor && errors.autor.type === "minLength" && (
              <small className="erro-validacao">
                Esse campo deve conter entre 3 e 100 caracteres
              </small>
            )}
            {errors.autor && errors.autor.type === "maxLength" && (
              <small className="erro-validacao">
                Esse campo deve conter entre 3 e 100 caracteres
              </small>
            )}

            <input
              type="text"
              name="editora"
              className="form-control"
              placeholder="Editora"
              onChange={(e) => setEditora(e.target.value)}
              ref={register({ required: true, minLength: 3, maxLength: 50 })}
            />
            {errors.editora && errors.editora.type === "required" && (
              <small className="erro-validacao">
                Esse campo deve ser preenchido
              </small>
            )}
            {errors.editora && errors.editora.type === "minLength" && (
              <small className="erro-validacao">
                Esse campo deve conter entre 3 e 50 caracteres
              </small>
            )}
            {errors.editora && errors.editora.type === "maxLength" && (
              <small className="erro-validacao">
                Esse campo deve conter entre 3 e 50 caracteres
              </small>
            )}

            <input
              type="number"
              name="edicao"
              className="form-control"
              placeholder="Edição"
              onChange={(e) => setEdicao(e.target.value)}
              ref={register({ required: true, minLength: 1, maxLength: 4 })}
            />
            {errors.edicao && errors.edicao.type === "required" && (
              <small className="erro-validacao">
                Esse campo deve ser preenchido
              </small>
            )}
            {errors.edicao && errors.edicao.type === "minLength" && (
              <small className="erro-validacao">
                Esse campo deve conter entre 1 e 4 caracteres
              </small>
            )}
            {errors.edicao && errors.edicao.type === "maxLength" && (
              <small className="erro-validacao">
                Esse campo deve conter entre 1 e 4 caracteres
              </small>
            )}

            <input
              type="text"
              name="isbn"
              className="form-control"
              placeholder="ISBN"
              onChange={(e) => setIsbn(e.target.value)}
              ref={register({ required: true, minLength: 17, maxLength: 17 })}
            />
            {errors.isbn && errors.isbn.type === "required" && (
              <small className="erro-validacao">
                Esse campo deve ser preenchido
              </small>
            )}
            {errors.isbn && errors.isbn.type === "minLength" && (
              <small className="erro-validacao">
                Esse campo deve conter 17 caracteres
              </small>
            )}
            {errors.isbn && errors.isbn.type === "maxLength" && (
              <small className="erro-validacao">
                Esse campo deve conter 17 caracteres
              </small>
            )}

            <Row>
              <Col>
                <button
                  type="submit"
                  className="btn-style-1"
                  onClick={clearMessages}
                >
                  Cadastrar
                </button>
              </Col>
              <Col>
                <button
                  type="reset"
                  className="btn btn-block btn-secondary"
                  onClick={clearMessages}
                >
                  Limpar
                </button>
              </Col>
            </Row>
          </form>
          {submitSuccessMessage.length > 0 && (
            <Row>
              <Col>
                <small className={"submit-success"}>
                  {submitSuccessMessage}
                </small>
              </Col>
            </Row>
          )}
          {submitErrorMessage.length > 0 && (
            <Row>
              <Col>
                <small className={"submit-error"}>{submitErrorMessage}</small>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      {loader}
    </Container>
  );
}
