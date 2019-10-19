import {RdfObjectLoader, Resource} from "rdf-object";
import rdfParser from "rdf-parse";
import {Readable} from "stream";

export class EarlParser {

  public async parse(subject: string, readable: Readable, path: string): Promise<IEarlData> {
    const objectLoader = new RdfObjectLoader({ context: require('./context-earl.json') });
    await objectLoader.import(rdfParser.parse(readable, { path , baseIRI: 'http://example.org/' }));

    // Collect all assertions for the given test subject
    const assertions: Resource[] = [];
    for (const resource in objectLoader.resources) {
      if (objectLoader.resources[resource].properties.testSubject
        .some((earlSubject) => earlSubject.term.value === subject)) {
        assertions.push(objectLoader.resources[resource]);
      }
    }

    // Calculate percentage of succeeded tests
    const passed = assertions.reduce((sum, assertion) => {
      if (assertion.property.testResult.property.resultOutcome.value !== 'http://www.w3.org/ns/earl#failed') {
        return sum + 1;
      }
      return sum;
    }, 0);

    return { compliance: passed / assertions.length };
  }

}

export interface IEarlData {
  compliance: number;
}
